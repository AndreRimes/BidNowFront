'use client';
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserPreferredTags, updateUserPreferredTags, getTags } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type Tag = {
  id: string;
  name: string;
};

export default function PreferredTags() {
  const queryClient = useQueryClient();
  const [tagInput, setTagInput] = useState("");

  const { data: preferredTags = [],error,isLoading } = useQuery<Tag[]>({
    queryKey: ["preferredTags"],
    queryFn: () => getUserPreferredTags(),
  });
  const { data: availableTags = [] } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const mutation = useMutation({
    mutationFn: (data: {tags: Tag[] }) => updateUserPreferredTags(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferredTags"] });
    },
    onError: (error) => {
      console.error("Error updating preferred tags:", error);
    },
  });

  const handleAddTag = (tag: Tag) => {
    mutation.mutate({tags: [...preferredTags, tag] });
    setTagInput("");
  };

  const handleRemoveTag = (tagId: string) => {
    mutation.mutate({tags: preferredTags.filter((tag) => tag.id !== tagId) });
  };

  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(tagInput.toLowerCase())
  );

  console.log(preferredTags);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex flex-col flex-grow gap-4 w-11/12 h-fit bg-white bg-background rounded-lg p-5">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-center">Preferred Tags</h2>
        <div className="space-y-2">
          <Input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Search and add tags"
          />
          <div className="flex flex-wrap gap-2">
            {filteredTags.map((tag) => (
              <Button key={tag.id} size="sm" onClick={() => handleAddTag(tag)}>
                {tag.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {preferredTags && preferredTags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-full"
            >
              <span>{tag.name}</span>
              <X
                className="h-4 w-4 cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => handleRemoveTag(tag.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
