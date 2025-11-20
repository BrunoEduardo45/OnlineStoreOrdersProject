import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center p-4 mt-5">
      <p className='m-0'>© {new Date().getFullYear()} — Online Store Orders</p>
    </footer>
  );
}
