"use client"

import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventClickArg, DateSelectArg, EventInput } from "@fullcalendar/core";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EventModal, type EventData } from "@/components/ui/event-modal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const colors = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#d946ef", // fuchsia
];

export default function CalendarPage() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState<DateSelectArg | null>(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [title, setTitle] = useState("");
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  
  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendar-events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDateInfo(selectInfo);
    setModalMode('create');
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    const eventData: EventData = {
      id: event.id,
      title: event.title,
      date: event.startStr.split('T')[0],
      time: event.allDay ? undefined : event.startStr.split('T')[1]?.substring(0, 5),
      color: event.backgroundColor || colors[7]
    };
    
    setSelectedEvent(eventData);
    setModalMode('edit');
    setSelectedDateInfo({
      start: event.start!,
      end: event.end!,
      startStr: event.startStr,
      endStr: event.endStr,
      allDay: event.allDay,
      view: clickInfo.view
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: { id?: string; title: string; time?: string, color: string }) => {
    if (selectedDateInfo) {
      const calendarApi = selectedDateInfo.view.calendar;
      calendarApi.unselect(); // clear date selection

      let start = selectedDateInfo.startStr;
      if (eventData.time) {
          start = `${selectedDateInfo.startStr.split('T')[0]}T${eventData.time}`;
      }

      if (modalMode === 'create') {
        // Create new event
        const newEvent: EventInput = {
          id: createEventId(),
          title: eventData.title,
          start,
          allDay: !eventData.time,
          backgroundColor: eventData.color,
          borderColor: eventData.color,
        };
        
        setEvents(prevEvents => [...prevEvents, newEvent]);
      } else {
        // Update existing event
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === eventData.id 
              ? {
                  ...event,
                  title: eventData.title,
                  start,
                  allDay: !eventData.time,
                  backgroundColor: eventData.color,
                  borderColor: eventData.color,
                }
              : event
          )
        );
      }
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const handleViewChange = (view: string) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
      setCurrentView(view);
      setTitle(calendarApi.view.title);
    }
  };

  const navigation = (action: 'prev' | 'next' | 'today') => {
    const calendarApi = calendarRef.current?.getApi();
    if(calendarApi){
        if(action === 'today') calendarApi.today();
        if(action === 'prev') calendarApi.prev();
        if(action === 'next') calendarApi.next();
        setTitle(calendarApi.view.title);
    }
  }
  
  useEffect(() => {
      const calendarApi = calendarRef.current?.getApi();
      if(calendarApi){
          setTitle(calendarApi.view.title);
      }
  }, [calendarRef])

  return (
    <div className="p-4 md:p-8 calendar-container">
       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigation('prev')}><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" onClick={() => navigation('next')}><ChevronRight className="h-4 w-4" /></Button>
                <Button variant="outline" onClick={() => navigation('today')}>Today</Button>
                <h2 className="text-lg sm:text-xl font-bold ml-4">{title}</h2>
            </div>

            <ToggleGroup type="single" value={currentView} onValueChange={handleViewChange} aria-label="Calendar View">
                <ToggleGroupItem value="dayGridMonth" aria-label="Month View">Month</ToggleGroupItem>
                <ToggleGroupItem value="timeGridWeek" aria-label="Week View">Week</ToggleGroupItem>
                <ToggleGroupItem value="timeGridDay" aria-label="Day View">Day</ToggleGroupItem>
            </ToggleGroup>
       </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={false}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        height="auto"
      />
      
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        selectedDate={selectedDateInfo ? selectedDateInfo.start : null}
        isTimeSelection={currentView === 'dayGridMonth'}
        mode={modalMode}
        existingEvent={selectedEvent}
      />
    </div>
  );
}

let eventGuid = 0;
function createEventId() {
  return String(eventGuid++);
} 