import React from 'react';
import HeroIdentity from './components/HeroIdentity';
import JourneyTimeline from './components/JourneyTimeline';
import HiddenVoice from './components/HiddenVoice';
import StarField from './components/StarField';
import Masks from './components/Masks';
import InteractiveMirror from './components/InteractiveMirror';
import OpenBook from './components/OpenBook';
import MysteryDoor from './components/MysteryDoor';
import Posts from './components/Posts/Posts';
import AmbientAudio from './components/AmbientAudio';

function App() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-x-hidden" dir="rtl">
      <AmbientAudio />
      
      {/* Background Stars */}
      <StarField />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroIdentity />
        <JourneyTimeline />
        <HiddenVoice />
        <Masks />
        <InteractiveMirror />
        <OpenBook />
        <Posts />
        <MysteryDoor />
      </div>
    </main>
  );
}

export default App;