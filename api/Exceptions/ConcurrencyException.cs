using System;

namespace api.Exceptions;

public class ConcurrencyException : Exception
{
    public ConcurrencyException(string message) : base(message)
    {
    }
} 