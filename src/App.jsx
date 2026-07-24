import React from 'react';
import forMobileImg from './assets/forMobile.png';
import forWebImg from './assets/forWeb.png';

export default function App() {
  const domain = "vortexglobaltechnologies.in";

  return (
    <div className="maintenance-wrapper">
      <div className="bg-glow"></div>
      
      <header className="maintenance-header">
        <span className="domain-tag">{domain}</span>
        <span className="status-badge">SYSTEM MAINTENANCE</span>
      </header>

      <main className="maintenance-content">
        <div className="poster-container desktop-poster">
          <img src={forWebImg} alt="Vortex Global Technologies Maintenance Web" />
        </div>
        <div className="poster-container mobile-poster">
          <img src={forMobileImg} alt="Vortex Global Technologies Maintenance Mobile" />
        </div>
      </main>
    </div>
  );
}
