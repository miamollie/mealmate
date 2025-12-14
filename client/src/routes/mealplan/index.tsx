import { component$, useSignal, $, useStore } from "@builder.io/qwik";
import { routeLoader$, Link } from "@builder.io/qwik-city";
import { client } from "../../../trpc";

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const useMealPlansLoader = routeLoader$(async () => {
  try {
    const result = await client.mealPlan.getAll.query({ page: 1, limit: 10 });
    return result;
  } catch (error) {
    console.error("Failed to load meal plans:", error);
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
});

export default component$(() => {
  const initialData = useMealPlansLoader();
  const mealPlans = useSignal(initialData.value.data);
  const pagination = useStore<PaginationState>(initialData.value.pagination);
  const isLoading = useSignal(false);
  const error = useSignal<string | null>(null);

  const loadPage = $(async (page: number) => {
    if (isLoading.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      const result = await client.mealPlan.getAll.query({
        page,
        limit: pagination.limit,
      });

      mealPlans.value = result.data;
      Object.assign(pagination, result.pagination);
    } catch (err) {
      error.value = "Failed to load meal plans. Please try again.";
      console.error("Error loading meal plans:", err);
    } finally {
      isLoading.value = false;
    }
  });

  const createMealPlan = $(async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      await client.mealPlan.create.mutate();
      // Reload the first page to show the new meal plan
      await loadPage(1);
    } catch (err) {
      error.value = "Failed to create meal plan. Please try again.";
      console.error("Error creating meal plan:", err);
    } finally {
      isLoading.value = false;
    }
  });

  // const formatDate = (date: Date) => {
  //   return new Date(date).toLocaleDateString("en-US", {
  //     weekday: "short",
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  // const getWeekEndDate = (startDate: Date) => {
  //   const endDate = new Date(startDate);
  //   endDate.setDate(endDate.getDate() + 6);
  //   return endDate;
  // };

  return (
    <div class="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div class="bg-white shadow-sm sticky top-0 z-10">
        <div class="px-4 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900">Meal Plans</h1>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error.value && (
        <div class="mx-4 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center gap-2">
            <svg
              class="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p class="text-red-700 text-sm">{error.value}</p>
          </div>
        </div>
      )}

      <div class="px-4 py-6">
        {mealPlans.value.length === 0 && !isLoading.value ? (
          <div class="text-center py-12">
            <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                class="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              No meal plans yet
            </h3>
            <p class="text-gray-500 mb-6">
              Create your first meal plan to get started with organized meal
              planning.
            </p>
            <button
              onClick$={createMealPlan}
              disabled={isLoading.value}
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Get started
            </button>
          </div>
        ) : (
          <>
            {/* Meal Plans List */}
            <div class="space-y-4">
              {mealPlans.value.map((plan) => (
                <Link
                  key={plan.id}
                  href={`/mealplan/${plan.id}/`}
                  class="block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <div class="p-4">
                    <div class="flex items-start justify-between mb-3">
                      <div class="flex-1">
                        DATE FORMATTING STUFF
                        {/* <h3 class="font-semibold text-gray-900 text-lg mb-1">
                          Week of {formatDate(plan.weekStartDate)}
                        </h3>
                        <p class="text-sm text-gray-500">
                          {formatDate(plan.weekStartDate)} -{" "}
                          {formatDate(getWeekEndDate(plan.weekStartDate))}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div class="mt-8 flex items-center justify-between">
                <div class="text-sm text-gray-500">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} meal plans
                </div>

                <div class="flex items-center gap-2">
                  <button
                    onClick$={() => loadPage(pagination.page - 1)}
                    disabled={!pagination.hasPreviousPage || isLoading.value}
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Previous
                  </button>

                  <div class="flex items-center gap-1">
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.page <= 3) {
                          pageNum = i + 1;
                        } else if (
                          pagination.page >=
                          pagination.totalPages - 2
                        ) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = pagination.page - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick$={() => loadPage(pageNum)}
                            disabled={isLoading.value}
                            class={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                              pageNum === pagination.page
                                ? "bg-blue-600 text-white"
                                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <button
                    onClick$={() => loadPage(pagination.page + 1)}
                    disabled={!pagination.hasNextPage || isLoading.value}
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Loading Overlay */}
      {isLoading.value && mealPlans.value.length > 0 && (
        <div class="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 shadow-xl">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span class="text-gray-700">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
