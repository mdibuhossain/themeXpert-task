import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth.context";

function Home() {
  const { history } = useContext(AuthContext);
  const [stories, setStories] = React.useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/stories`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setStories(res.data.stories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleVisitStory = (id) => {
    history(`/stories/${id}`);
  };

  console.log(stories);
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Stories
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {stories.length === 0 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-3">
            <p className="text-center">No stories available!</p>
          </div>
        )}
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white shadow overflow-hidden sm:rounded-lg p-3 hover:shadow-blue-300 cursor-pointer"
            onClick={() => handleVisitStory(story.id)}
          >
            <h3 className="font-semibold text-md">{story?.author?.fullName}</h3>
            <p className="text-xs italic">
              {new Date(story.createdAt).toDateString()}
            </p>
            <p className="text-base">{story.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
