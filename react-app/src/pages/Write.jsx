import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import axios from "axios";

function Write() {
  const { user } = useContext(AuthContext);
  const [story, setStory] = React.useState(null);
  const [option, setOption] = React.useState([]);
  const [showOptionForm, setShowOptionForm] = React.useState(false);

  console.log(story);

  const handleToggleOptionForm = () => {
    setShowOptionForm(!showOptionForm);
  };

  const handleInitialStoryCreate = (e) => {
    e.preventDefault();
    const payload = {
      title: e.target.title.value,
      content: e.target.content.value,
    };
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/nodes`,
        { content: payload.content },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 201) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/stories`,
              {
                title: payload.title,
                authorId: user.id,
                startNodeId: res.data.node.id,
              },
              { withCredentials: true }
            )
            .then((res) => {
              if (res.status === 201) {
                setStory(res.data.story);
                alert("Story created successfully");
              }
            })
            .catch((err) => {
              alert(err.response.data.errors);
            });
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        alert(err.response.data.errors);
      });
  };

  const handleAddNewOptionWithNode = (e) => {
    e.preventDefault();
    const payload = {
      title: e.target.title.value,
      content: e.target.content.value,
    };
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/choices`,
        {
          title: payload.title,
          nodeId: story.startNode.id,
          content: payload.content,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setOption((prev) => [...prev, res.data.choice]);
          alert("Option added successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePublishStory = (e) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/stories/${story.id}/publish`,
        { published: true },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setStory(null);
          setOption([]);
          setShowOptionForm(false);
          alert("Story published successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fullPage flex items-center justify-center py-1 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Write story
          </h2>
        </div>
        {story && (
          <button
            className="mt-2 group relative ms-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-600 hover:bg-green-700 focus:ring-green-500"
            onClick={handlePublishStory}
          >
            Publish
          </button>
        )}
        <form onSubmit={handleInitialStoryCreate} className="mt-3 space-y-3">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="title"
                name="title"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Title"
                defaultValue={story?.title || ""}
                required
              />
            </div>
            <div>
              <textarea
                id="content"
                name="content"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Content"
                defaultValue={story?.startNode?.content || ""}
                required
              />
            </div>
          </div>
          {!story && (
            <div>
              <button
                type="submit"
                className={`group relative ms-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  story?.id
                    ? "bg-gray-200 "
                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                } `}
                disabled={story}
              >
                Proceed
              </button>
            </div>
          )}
        </form>

        {story && (
          <>
            <div className="mt-4">
              {option.map((choice) => (
                <div
                  key={choice.id}
                  className="mt-2 px-2 rounded-full bg-blue-200"
                >
                  <div className="font-semibold">{choice.title}</div>
                </div>
              ))}
            </div>
            <div className="pt-6">
              <div>
                <button
                  className="group relative flex justify-center items-center gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                  onClick={handleToggleOptionForm}
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="white"
                  >
                    {showOptionForm ? (
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
                    ) : (
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                    )}
                  </svg>
                  {showOptionForm ? "Close" : "Add option"}
                </button>
              </div>
              {showOptionForm && (
                <form
                  onSubmit={handleAddNewOptionWithNode}
                  className="mt-3 space-y-3"
                >
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Option title"
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        id="content"
                        name="content"
                        type="text"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Remaining story content"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative ms-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                    >
                      Add
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Write;
