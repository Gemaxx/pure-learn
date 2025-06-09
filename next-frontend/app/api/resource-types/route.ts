import { NextResponse } from "next/server"

// The URL of your locally running API
const LOCAL_API_URL = "http://localhost:3000/api/resource-types"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, units } = body

    // Validate the input
    if (!name || !units) {
      return NextResponse.json({ message: "Name and units are required" }, { status: 400 })
    }

    if (name.length > 100 || units.length > 100) {
      return NextResponse.json({ message: "Name and units must be 100 characters or less" }, { status: 400 })
    }

    // Forward the request to your local API
    const response = await fetch(LOCAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, units }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to create resource type" }))
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating resource type:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
