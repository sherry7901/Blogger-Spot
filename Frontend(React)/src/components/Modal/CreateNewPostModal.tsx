import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const CreatenewpostModal = ({ isCreateNewPostModal, setIsCreateNewPostModal, handleAddPost, editingPost }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setDescription(editingPost.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingPost]);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setError(null);
    handleAddPost(title, description);
    setIsCreateNewPostModal(false); // Close modal after submission
  };

  return (
    <div>
      <Dialog open={isCreateNewPostModal} onClose={() => setIsCreateNewPostModal(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-start sm:items-start sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-start sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h1" className="text-base font-semibold leading-6 text-gray-900">Title:</DialogTitle>
                    <input
                      type="text"
                      placeholder="Enter title here"
                      className="block w-full h-24 border border-gray-300 rounded-md py-1.5 px-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 mt-4">Your Content:</DialogTitle>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={10}
                      className="mt-2 block h-96 w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Post
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateNewPostModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreatenewpostModal;
