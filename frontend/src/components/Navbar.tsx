import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface NavbarProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export function Navbar({ onSearch, showSearch = false }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b-2 border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-6">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="mr-2">
              {/* textual logo: 'hd' with 'd' highlighted in yellow */}
              <div className="bg-black text-white p-2 rounded-lg flex items-center justify-center w-10 h-10">
                <span className="text-lg font-bold leading-none">
                  <span className="align-middle">h</span>
                  <span className="align-middle text-yellow-400">d</span>
                </span>
              </div>
            </div>
            <span className="text-xl font-bold leading-tight">
              <span>hideway</span>
              <br />
              <span className="text-yellow-400">delite</span>
            </span>
          </div>

          {showSearch && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search experiences"
                  className="pl-10 bg-gray-200 w-full min-w-[140px] sm:min-w-48 lg:min-w-80"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 sm:px-4">
                <span className="hidden sm:inline">Search</span>

                <Search className="sm:hidden" size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
