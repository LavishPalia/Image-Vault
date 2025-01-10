import React, { useState, useEffect, useRef } from "react";
import {
  Crop,
  DoorOpen,
  FlipHorizontal2,
  FlipVertical2,
  Pen,
  Plus,
  Replace,
  RotateCcw,
  Trash,
  Trash2Icon,
  Upload,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

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
  const [isEditing, setIsEditing] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const cropperRef = useRef(null);

  const navigate = useNavigate();

  const flipImageHorizontally = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.scaleX(cropper.getData().scaleX * -1);
  };

  const flipImageVertically = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.scaleY(cropper.getData().scaleY * -1);
  };

  const cropImage = () => {
    console.log("crop image ran");

    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      console.log("cropper exist");

      const canvas = cropper.getCroppedCanvas();
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            console.log("cropped image base-64 url->", reader.result);

            setCroppedImage(reader.result);
          };
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        1
      );
    }

    setIsEditing(false);
  };

  const rotateClockwise = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.rotate(90);
    }
  };

  useEffect(() => {
    return () => {
      if (croppedImage) URL.revokeObjectURL(croppedImage);
      if (selectedImage) URL.revokeObjectURL(selectedImage);
    };
  }, [selectedImage, croppedImage]);

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
                {isEditing ? (
                  <div className="relative">
                    <Cropper
                      ref={cropperRef}
                      src={selectedImage}
                      aspectRatio={1}
                      guides={false}
                    />

                    <Button
                      className="absolute rounded-r-none top-2 right-16"
                      onClick={() => setIsEditing(false)}
                    >
                      <Trash2Icon />
                    </Button>
                    <Button
                      className="absolute rounded-l-none top-2 right-5"
                      onClick={cropImage}
                    >
                      <DoorOpen />
                    </Button>
                  </div>
                ) : (
                  <img
                    src={croppedImage || selectedImage}
                    alt="Selected Preview"
                    className="w-full h-[600px] object-center object-cover rounded-xl pt-2"
                  />
                )}

                {/* Collapsible in the top-right corner */}
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="absolute space-y-2 text-white rounded-lg shadow-md bg-black/50 top-16 right-4"
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
                    <Button
                      className="p-0 bg-transparent w-9 hover:bg-transparent"
                      onClick={() => setIsEditing(true)}
                    >
                      <Crop />
                    </Button>
                    <Button
                      className="p-0 bg-transparent w-9 hover:bg-transparent"
                      onClick={rotateClockwise}
                    >
                      <RotateCcw />
                    </Button>
                    <Button
                      className="p-0 bg-transparent w-9 hover:bg-transparent"
                      onClick={flipImageHorizontally}
                    >
                      <FlipHorizontal2 />
                    </Button>

                    <Button
                      className="p-0 bg-transparent w-9 hover:bg-transparent"
                      onClick={flipImageVertically}
                    >
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
                      setSelectedImage(null);
                      setSheetOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="px-4 py-2 text-white bg-[#334D6E] rounded hover:bg-[#334D6E]/90"
                    onClick={() => {
                      const imageToUpload = croppedImage || selectedImage;

                      const newImage = {
                        url: imageToUpload,
                        name: selectedImageName,
                      };

                      setImages((prevImages) => {
                        const updatedImages = [...prevImages, newImage];

                        localStorage.setItem(
                          "images",
                          JSON.stringify(updatedImages)
                        );

                        navigate("/gallery", {
                          state: updatedImages,
                        });

                        return updatedImages;
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
