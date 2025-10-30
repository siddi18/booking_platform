import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Badge removed (slots label removed) — no longer used
import { getExperiences, type Experience } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Home() {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchExperiences = async () => {
    setLoading(true);
    setExperiences([]); // Clear previous experiences before fetching new ones
    try {
      const data = await getExperiences(currentPage, 9, searchQuery);
      setExperiences(data.experiences);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      setExperiences([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // availability calculation removed because slots label was removed from the UI

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} showSearch={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="h-80 animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No experiences found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {experiences.map((experience) => {
                return (
                  <Card
                    key={experience._id}
                    className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border-x-2 border-b-2 border-gray-200 flex flex-col bg-gray-100 rounded-xl py-0 gap-0"
                  >
                    <div className="relative w-full h-60 overflow-hidden bg-gray-200 rounded-t-xl">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/400x300/4ade80/000000?text=" +
                            encodeURIComponent(experience.title);
                        }}
                      />
                    </div>
                    <div className="p-4 flex flex-col grow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg leading-snug pr-2 mt-0 mb-0">
                          {experience.title}
                        </h3>
                        <div className="bg-gray-300 text-gray-700 text-sm font-medium px-2 py-0.5 rounded-sm whitespace-nowrap">
                          {experience.location}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 grow">
                        {experience.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xs text-gray-500">From </span>
                          <span className="text-xl font-bold">
                            ₹{experience.price}
                          </span>
                        </div>

                        {/* Move View Details button to the right where slots previously were */}
                        <Button
                          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-2"
                          onClick={() => navigate(`/experience/${experience._id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      className={
                        currentPage === i + 1
                          ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                          : ""
                      }
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
