import React from 'react';

const Loader = () => {
  return (
    <div>
        <div className="mx-auto position-absolute bottom-0 start-50 translate-middle-x">
          <div class="spinner-grow text-success p-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-danger p-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-warning p-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
    </div>
  )
}

export default Loader