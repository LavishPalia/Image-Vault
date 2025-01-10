import React, { useState, useEffect } from "react";
import {
  Crop,
  Cross,
  Edit,
  FlipHorizontal,
  FlipHorizontal2,
  FlipVertical,
  FlipVertical2,
  Pen,
  Plus,
  Replace,
  Rotate3D,
  RotateCcw,
  RotateCcwIcon,
  Trash,
  Upload,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"; // Use the Sheet components
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const AddImage = ({
  handleFileSelect,
  selectedImage,
  selectedImageName,
  setSelectedImage,
  isSheetOpen,
  setSheetOpen,
  setSelectedImageName,
  setImages,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [title, setTitle] = useState(selectedImageName);

  // Synchronize title with selectedImageName
  // useEffect(() => {
  //   if (selectedImageName) {
  //     setTitle(selectedImageName);
  //   }
  // }, [selectedImageName]);

  // console.log(selectedImageName);
  // console.log(title);

  const navigate = useNavigate();

  // Clean up object URL
  useEffect(() => {
    return () => {
      if (selectedImage) URL.revokeObjectURL(selectedImage);
    };
  }, [selectedImage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Upload section */}
      <p className="pb-6 tracking-wide text-muted-foreground">
        Add Assets here
      </p>
      <label
        className="px-4 py-2 text-black bg-[#334d6e] rounded cursor-pointer hover:bg-[#334d6e]/90"
        aria-label="Upload Image"
      >
        <Plus />
        Add
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>

      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        {/* Sheet Content */}
        <SheetContent side="right" className="w-full h-full">
          <SheetHeader>
            <SheetTitle>Add Asset</SheetTitle>
          </SheetHeader>

          {selectedImage && (
            <div className="grid h-full grid-cols-10 gap-4">
              {/* Image Preview */}
              <div className="relative h-full col-span-7">
                <img
                  src={selectedImage}
                  alt="Selected Preview"
                  className="w-full h-[600px] object-center object-cover rounded-xl pt-2"
                />

                {/* Collapsible in the top-right corner */}
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="absolute space-y-2 text-white rounded-lg shadow-md bg-black/50 top-8 right-4"
                >
                  <div className="flex items-center justify-between">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="default"
                        size="sm"
                        className="p-0 bg-transparent w-9 hover:bg-transparent"
                      >
                        {!isOpen ? (
                          <Pen className="w-4 h-4" />
                        ) : (
                          <Trash className="size-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent className="flex flex-col items-center justify-center space-y-2">
                    {/* <div className="px-4 py-3 font-mono text-sm border rounded-md">
                      @radix-ui/colors
                    </div> */}
                    <Button className="p-0 bg-transparent w-9 hover:bg-transparent">
                      <Crop />
                    </Button>
                    <Button className="p-0 bg-transparent w-9 hover:bg-transparent">
                      <RotateCcw />
                    </Button>
                    <Button className="p-0 bg-transparent w-9 hover:bg-transparent">
                      <FlipHorizontal2 />
                    </Button>

                    <Button className="p-0 bg-transparent w-9 hover:bg-transparent">
                      <FlipVertical2 />
                    </Button>
                    <Button className="p-0 bg-transparent w-9 hover:bg-transparent">
                      <Replace />
                    </Button>
                    {/* <div className="px-4 py-3 font-mono text-sm border rounded-md">
                      @stitches/react
                    </div> */}
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Form Section */}
              <div className="flex flex-col col-span-3 gap-4">
                <input
                  type="text"
                  placeholder="Asset Title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                  value={selectedImageName}
                  onChange={(e) => setSelectedImageName(e.target.value)}
                />
                <textarea
                  placeholder="Enter Description"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                  rows="6"
                ></textarea>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectedImage(null); // Clear the image
                      setSheetOpen(false); // Close the sheet
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="px-4 py-2 text-white bg-[#334D6E] rounded hover:bg-[#334D6E]/90"
                    onClick={() => {
                      const newImage = {
                        url: selectedImage,
                        name: selectedImageName,
                      };

                      // Update the images state
                      setImages((prevImages) => {
                        const updatedImages = [...prevImages, newImage];

                        localStorage.setItem(
                          "images",
                          JSON.stringify(updatedImages)
                        );

                        // Navigate with the updated state
                        navigate("/gallery", {
                          state: updatedImages,
                        });

                        return updatedImages; // Ensure the state is updated
                      });
                      setSheetOpen(false);
                    }}
                  >
                    <Upload />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddImage;
