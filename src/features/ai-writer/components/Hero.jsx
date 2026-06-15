import { Spotlight } from "../../../components/ui/Spotlight";
import { SplineScene } from "../../../components/ui/SplineScene";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const handleScrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex flex-col lg:flex-row items-center w-full max-w-7xl mx-auto px-8 md:px-16 py-12 lg:py-0">
        {/* Left Content */}
        <div className="flex-1 relative z-10 text-center lg:text-left mt-20 lg:mt-0">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tight leading-[1.1]">
            AI Writing
            <br />
            Assistant
          </h1>

          <p className="mt-6 text-neutral-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Turn ideas into complete copy with one chat flow, full history tracking, and fast AI responses.
            WriteAI helps you build articles, emails, captions, and content faster.
          </p>

          <div className="flex gap-4 mt-8 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 bg-white text-black rounded-lg font-medium cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              Launch Workspace
            </button>

            <button
              onClick={handleScrollToFeatures}
              className="px-6 py-3 border border-white/20 text-white rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              View Features
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto lg:mx-0">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-violet-300 uppercase tracking-[0.3em] mb-2">Chat Threads</p>
              <p className="text-sm text-neutral-300">Keep each conversation organized with complete chat history.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-violet-300 uppercase tracking-[0.3em] mb-2">Streaming Output</p>
              <p className="text-sm text-neutral-300">See AI responses build in real time as you ask follow-up questions.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-violet-300 uppercase tracking-[0.3em] mb-2">Workspace Control</p>
              <p className="text-sm text-neutral-300">Customize model behavior, theme, and history without leaving the app.</p>
            </div>
          </div>
        </div>

        {/* Right Side 3D Canvas */}
        <div className="flex-1 relative h-[400px] lg:h-[600px] w-full">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <button 
        onClick={handleScrollToFeatures}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-500 hover:text-white transition-colors animate-bounce cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest block mb-1 text-[9px]">Explore</span>
        <div className="text-center text-sm">↓</div>
      </button>
    </section>
  );
}
