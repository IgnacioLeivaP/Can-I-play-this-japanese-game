import React from 'react';

export function Background() {
  return (
    <>
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420')] bg-cover bg-center bg-no-repeat opacity-20" />
      <div className="fixed inset-0 bg-gradient-radial from-background/50 to-background" />
    </>
  );
}