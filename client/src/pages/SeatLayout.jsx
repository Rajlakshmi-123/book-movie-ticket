import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyShowsData, dummyDateTimeData, assets } from '../assets/assets'
import { Clock, ArrowRight } from 'lucide-react'
import ISOtimeFormat from '../lib/ISOtimeFormat'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'

const SeatLayout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const fetchShowData = () => {
    const foundMovie = dummyShowsData.find(item => item._id === id || item.id === Number(id));
    if (foundMovie) {
      setShow({ movie: foundMovie, dateTime: dummyDateTimeData });
    }
  };

  useEffect(() => {
    fetchShowData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast.error("Please select time first");

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 5) return toast.error("You can only select 5 seats");
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const renderSeats = (rowName, count = 9) => {
    return (
      <div key={rowName} className='flex items-center gap-2 mb-2'>
        <span className='w-4 text-xs text-gray-500 uppercase'>{rowName}</span>
        <div className='flex items-center gap-2'>
          {Array.from({ length: count }).map((_, i) => {
            const seatId = `${rowName}${i + 1}`;
            const isSelected = selectedSeats.includes(seatId);
            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`w-8 h-8 rounded-md text-[10px] font-medium transition-all ${isSelected ? 'bg-primary text-white' : 'bg-white/5 border border-white/10 hover:border-primary/50 text-white'}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  if (!show) return <Loading />;

  return (
    <div className='px-6 md:px-10 lg:px-16 py-32 min-h-screen relative overflow-hidden bg-black text-white'>
      <div className='flex flex-col lg:flex-row gap-12'>

        {/* Left Column: Timings */}
        <div className='lg:w-1/4'>
          <p className='text-xl font-semibold mb-6 flex items-center gap-2'>
            <Clock className='w-5 h-5 text-primary' /> Available Timings
          </p>
          <div className='flex flex-wrap lg:flex-col gap-4'>
            {show.dateTime[date]?.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedTime?.time === item.time ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 hover:border-primary/40 text-white'}`}
              >
                <p className='text-sm font-medium'>{ISOtimeFormat(item.time)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Seat Layout */}
        <div className='flex-1 relative'>
          <BlurCircle top='0' right='0' />
          <h1 className='text-3xl font-bold mb-4'>Select Your Seat</h1>

          {/* Screen Indicator */}
          <div className='mb-10 text-center'>
            <img src={assets.screenImage} alt="Screen" className='w-full max-w-xl mx-auto opacity-50' />
            <p className='text-xs text-gray-500 mt-2 uppercase tracking-widest'>All eyes this way (Screen)</p>
          </div>

          <div className='flex flex-col items-center overflow-x-auto no-scroll-bar pb-8'>
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(row => renderSeats(row))}
          </div>

          {/* Proceed Button */}
          <button
            onClick={() => navigate('/my-bookings')}
            className='mt-8 w-full bg-primary text-white flex items-center justify-center gap-2 py-4 rounded-xl font-semibold hover:bg-red-600 transition-all'
          >
            Proceed to Checkout <ArrowRight className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeatLayout