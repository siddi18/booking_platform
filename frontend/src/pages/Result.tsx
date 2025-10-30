import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, bookingRef, experience, date, time, quantity, total, error, existingBooking } = 
    location.state as {
      success: boolean;
      bookingRef?: string;
      experience?: string;
      date?: string;
      time?: string;
      quantity?: number;
      total?: number;
      error?: string;
      existingBooking?: string;
    };

  if (!location.state) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8 text-center bg-gray-200">
          {success ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed</h1>
              <p className="text-gray-600 mb-6">
                Ref ID: <span className="font-semibold text-black">{bookingRef}</span>
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-4">Booking Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold">{experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-semibold">{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-semibold">{time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-semibold">Total Paid</span>
                    <span className="font-bold text-lg">₹{total}</span>
                  </div>
                </div>
              </div>

              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2 text-red-600">Booking Failed</h1>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <p className="text-red-700 mb-2">
                  {error || "An error occurred while processing your booking."}
                </p>
                {existingBooking && (
                  <p className="text-sm text-red-600">
                    Your existing booking reference: <span className="font-semibold">{existingBooking}</span>
                  </p>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-6">
                {existingBooking 
                  ? "You cannot book the same experience for the same date and time twice. Please check your existing bookings or choose a different date/time."
                  : "Please try again or contact support if the issue persists."}
              </p>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button>
                <Button
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
