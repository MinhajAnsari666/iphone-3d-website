export default function Footer() {
  return (
    <footer className="bg-secondary text-neutral-400 py-12 px-6 md:px-20 text-sm border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex space-x-6 mb-6 md:mb-0 border-b md:border-none pb-6 md:pb-0 border-white/10 w-full md:w-auto overflow-x-auto whitespace-nowrap">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Sales and Refunds</a>
          <a href="#" className="hover:text-white transition-colors">Legal</a>
          <a href="#" className="hover:text-white transition-colors">Site Map</a>
        </div>
        <div className="w-full md:w-auto text-left md:text-right">
          India
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="w-full text-center md:text-left">
          Copyright © {new Date().getFullYear()} Apple Inc. (Clone for demonstration). All rights reserved.
        </p>
      </div>
    </footer>
  );
}
