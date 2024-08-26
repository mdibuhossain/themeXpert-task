import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function StoryView() {
  const [story, setStory] = React.useState(null);
  const [currentNode, setCurrentNode] = React.useState(null);
  const [choosenNode, setChoosenNode] = React.useState(null);
  const { id } = useParams();

  const handleSwitchNode = (nodeId) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/nodes/${nodeId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setChoosenNode(res.data.node);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/stories/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setStory(res.data.story);
          setCurrentNode(res.data.story.startNode);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log(choosenNode);
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Story
      </h2>
      {story && (
        <div>
          <div className="bg-white overflow-hidden sm:rounded-lg p-1">
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
          {currentNode?.choices.length > 0 && (
            <div className="mt-2">
              <h3 className="text-md font-semibold text-blue-400">Choices</h3>
              <div className="mt-2 flex flex-row gap-5 flex-wrap">
                {currentNode?.choices.map((choice) => (
                  <div
                    key={choice.id}
                    className={`bg-white shadow overflow-hidden sm:rounded-lg p-2 hover:shadow-green-400 cursor-pointer ${
                      choosenNode?.id === choice.nextNodeId &&
                      "shadow-green-500"
                    }`}
                    onClick={() => handleSwitchNode(choice.nextNodeId)}
                  >
                    <p className="text-sm font-medium">{choice.title}</p>
                  </div>
                ))}
              </div>
              {choosenNode && (
                <>
                  <div className="shadow shadow-gray-400/60 p-3 rounded-lg mt-5">
                    <h3 className="text-lg font-semibold">
                      {choosenNode.title}
                    </h3>
                    <p className="text-base">{choosenNode.content}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StoryView;
