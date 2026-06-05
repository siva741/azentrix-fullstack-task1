import { FiCreditCard, FiDatabase } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-600 text-white shadow-sm">
            <FiCreditCard className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
              BudgetFlow
            </h1>
            <p className="text-xs font-medium uppercase text-slate-500">
              Personal Budget Tracker
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 sm:flex">
          <FiDatabase className="h-4 w-4" />
          Local storage
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
