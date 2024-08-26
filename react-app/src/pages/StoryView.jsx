import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function StoryView() {
  const [story, setStory] = React.useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/stories/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setStory(res.data.story);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Story
      </h2>
      {story && (
        <>
          <div className="bg-white overflow-hidden sm:rounded-lg p-3">
            <div className="flex flex-row justify-start items-center flex-wrap">
              <span>Author:&nbsp;</span>
              <h3 className="font-semibold text-md">
                {story?.author?.fullName}
              </h3>
            </div>
            <p className="text-xs italic">
              {new Date(story.createdAt).toDateString()}
            </p>
            <div className="shadow shadow-gray-400/60 p-3 rounded-lg mt-2">
              <h3 className="text-lg font-semibold">{story.title}</h3>
              <p className="text-base">{story.startNode?.content}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StoryView;
