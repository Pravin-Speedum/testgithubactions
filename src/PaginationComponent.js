import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Function to fetch paginated data
const fetchPaginatedData = async (page, limit) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  
  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  const totalPosts = response.headers.get('X-Total-Count');
  const totalPages = Math.ceil(totalPosts / limit); // Calculate the total number of pages

  const posts = await response.json();
  
  return { posts, totalPages };
};

const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Use TanStack Query to fetch paginated data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['paginatedData', currentPage, pageSize], // Query key as an array
    queryFn: () => fetchPaginatedData(currentPage, pageSize), // Query function
    keepPreviousData: true, // Keep previous data while the new page is loading
    staleTime: 5000, // Cache data for 5 seconds
  });

  // Loading and error handling
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // Handle page changes
  const handleNextPage = () => {
    if (currentPage < data.totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Paginated Posts</h1>

      {/* Display the fetched data */}
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {data.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === data.totalPages}
        >
          Next
        </button>

        {/* Page size selector */}
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationComponent;
