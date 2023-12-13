
import { useSelector } from "react-redux";
import { Dialog } from 'primereact/dialog';
import Avatar from "react-avatar-edit";

import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';
import img from '../../profile.png';
// import img from '../../assets/image/profile.png';
import http from "../../utils/http";

function Profile() {
  const { sellerInfo, jwt } = useSelector((state) => state.auth);
  const [imageCrop, setImageCrop] = useState(false);
  const [image, setImage] = useState("");
  const [src, setSrc] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const [pview, setPview] = useState(false);

  const avatarFinal = avatar.map((item) => item.pview);


  const onClose = () => {
    setPview(null);
  };

  const onCrop = (view) => {
    setPview(view);
  };

  const saveCropImage = () => {
    setAvatar([...avatar, { pview }]);
    setImageCrop(false);
  };

  const handleEdit = () => {
    navigate("/EditProfile");
  };

  const handleDelete = async () => {
    try {
      const response = await http.delete('/users/' + sellerInfo._id, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("SellerInfo deleted successfully", response.data);
      
    // Clear avatar state
    setAvatar([]);
    localStorage.clear();
    } catch (error) {
      console.error("Error deleting SellerInfo", error);
    }
  };

  useEffect(() => {
    console.log("User Information:", sellerInfo);
  }, [sellerInfo]);

  return (
    <div className="w-full h-full m-6 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="profile_img text-center mb-4">
          <img
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            onClick={() => setImageCrop(true)}
            src={avatarFinal.length ? avatarFinal : img}
            alt=""
          />
          <label htmlFor="" className="mt-3 font-semibold text-sm">{sellerInfo.username}</label>
          <Dialog
            visible={imageCrop}
            header={() => (
              <p htmlFor="" className="text-2xl font-semibold text-white">
                Update Avatar
              </p>
            )}
            onHide={() => setImageCrop(false)}
          >
            <div className="confirmation-content flex flex-col items-center">
              <Avatar
                width={500}
                height={400}
                onCrop={onCrop}
                onClose={onClose}
                src={src}
                shadingColor={"#474649"}
                backgroundColor={"#474649"}
              />
              <div className="flex flex-col items-center mt-5 w-full">
                <div className="flex justify-around w-full mt-4">
                  <Button
                    onClick={saveCropImage}
                    label="Save"
                    icon="pi pi-check"
                  />
                </div>
              </div>
            </div>
          </Dialog>
          <InputText
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substring(0, 5) === "image") {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
        </div>

        <div className="bg-darkgray p-4 mb-4 rounded w-full">
          <div className="flex flex-row items-start justify-start">
            <div className="flex flex-col mx-4 w-full">
              <label className="block text-sm mb-2 text-darkgray p-2 rounded"><strong>Username</strong></label>
              <div className="border-l border-r border-b border-t border-darkgray bg-white p-2 h-10 rounded flex items-center justify-center">{sellerInfo.username}</div>
            </div>
            <div className="flex flex-col mx-4 w-full">
              <label className="block text-sm mb-2 text-darkgray p-2 rounded"><strong>First name</strong></label>
              <div className="border-l border-r border-b border-t border-darkgray bg-white p-2 h-10 rounded flex items-center justify-center">{sellerInfo.first_name}</div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-start">
            <div className="flex flex-col mx-4 w-full">
              <label className="block text-sm mb-2 text-darkgray p-2 rounded"><strong>Last name</strong></label>
              <div className="border-l border-r border-b border-t border-darkgray bg-white p-2 h-10 rounded flex items-center justify-center">{sellerInfo.last_name}</div>
            </div>
            <div className="flex flex-col mx-4 w-full">
              <label className="block text-sm mb-2 text-darkgray p-2 rounded"><strong>Email</strong></label>
              <div className="border-l border-r border-b border-t border-darkgray bg-white p-2 h-10 rounded flex items-center justify-center">{sellerInfo.email}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleEdit}
          />
          <Button
            label="Delete Account"
            icon="pi pi-trash"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
export default Profile;