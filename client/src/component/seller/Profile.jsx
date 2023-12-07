import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Avatar from "react-avatar-edit";
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';
import img from '../../profile.png';
import http from "../../utils/http";

function Profile() {

  const { sellerInfo , jwt} = useSelector((state) => state.auth);
  const [imageCrop, setImageCrop] = useState(false);
  const [image, setImage] = useState("");
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pview, setPview] = useState(false);

  const profileFinal = profile.map((item) => item.pview);

  const navigate = useNavigate(); 

  const onClose = () => {
    setPview(null);
  };

  
  const onCrop = (view) => {
    setPview(view);
  };
  
  const saveCropImage = () => {
    setProfile([...profile, { pview }]);
    setImageCrop(false);
  };

  const handleEdit = () => {
     navigate("/EditProfile");
  };

  const handleDelete = async () => {
    try {
      const response = await http.delete('/users/'+sellerInfo._id, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      // dispatch(deleteSellerInfo());
  
      console.log("SellerInfo deleted successfully", response.data);
    } catch (error) {
      console.error("Error deleting SellerInfo", error);
    }
  };
  

  useEffect(() => {
    console.log("User Information:", sellerInfo);
  }, [sellerInfo]);

  return (
    <div className="w-full h-full m-6">
      <div className="p-6 w-full bg-gray-500 shadow-md">
        <div className="profile_img text-center p-4">
          <div className="flex flex-col justify-center items-center">
            <img
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              onClick={() => setImageCrop(true)}
              src={profileFinal.length ? profileFinal : img}
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
                <div className="flex flex-col items-center mt-5 w-12">
                  <div className="flex justify-around w-12 mt-4">
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
        </div>

        <div className="mt-8 flex flex-col">
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-2"><strong>Username</strong></label>
            <div className="border-b border-gray-300">{sellerInfo.username}</div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-2"><strong>First name</strong></label>
            <div className="border-b border-gray-300">{sellerInfo.first_name}</div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-2"><strong>Last name</strong></label>
            <div className="border-b border-gray-300">{sellerInfo.last_name}</div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-sm mb-2"><strong>Email</strong></label>
            <div className="border-b border-gray-300">{sellerInfo.email}</div>
          </div>
        </div>
         <div className="mt-2 flex items-center space-x-2">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleEdit}
          />
          <Button
            label="Delete Account"
            icon="pi pi-trash"
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;