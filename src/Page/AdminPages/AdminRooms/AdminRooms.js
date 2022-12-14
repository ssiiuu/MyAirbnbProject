import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Tooltip, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Column from "antd/lib/table/Column";
import { useHistory, useParams } from "react-router-dom";
import {
  deleteRoomAction,
  getRoomDetailAction,
  getRoomListAction,
  updateImgRoomAction,
} from "../../../redux/Actions/roomAction";

const { Search } = Input;

export default function AdminRooms() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { locationId } = useParams();

  const fileInput = useRef();
  const btnUpdateImg = useRef();

  const [selectedFile, setSelectedFile] = useState(null);

  const [searchRoom, setSearchRoom] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getRoomListAction(locationId));
  }, []);

  let { roomList } = useSelector((state) => state.roomReducer);

  let roomListData = [...roomList];

  if (searchRoom != "") {
    roomListData = roomList.filter((room) => {
      return room.name?.toLowerCase().includes(searchRoom.toLowerCase());
    });
  }

  const onSearch = (value) => {
    roomListData = roomList.filter((room) => {
      return room.name?.toLowerCase().includes(value.toLowerCase());
    });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const handleChangeFile = (e) => {
    //Lay file ra tu e
    let file = e.target.files[0];
    setSelectedFile(file);
    setIsModalVisible(true);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
    // btnUpdateImg.current.click();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div className="flex justify-center items-center">
          <Button
            onClick={() => {
              history.push(`/admin/rooms/addnew/${locationId}`);
            }}
            size="large"
            className="mx-5 text-red-500 bg-white border-red-500 hover:bg-red-500 hover:text-white rounded"
          >
            Th??m ph??ng m???i
          </Button>

          <Search
            placeholder="Nh???p t??n ph??ng..."
            onSearch={onSearch}
            onChange={(e) => {
              setSearchRoom(e.target.value);
            }}
            enterButton
            size="large"
            allowClear
            style={{ width: 300 }}
          />
        </div>
        <div className="flex items-end mr-5">
          <h1 className="text-red-500 text-3xl font-bold m-0">
            {roomList[0]?.locationId?.name}
          </h1>
          <span className="text-red-400 text-sm font-semibold ml-2 mb-1">
            {roomList[0]?.locationId?.province},
            {roomList[0]?.locationId?.country}
          </span>
        </div>
      </div>
      <Table
        dataSource={roomListData}
        onChange={onChange}
        rowKey={"_id"}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
      >
        <Column
          title="STT"
          key="stt"
          align="center"
          className="font-semibold"
          render={(value, item, index) => {
            return (page - 1) * 10 + index + 1;
          }}
        />
        <Column
          title="Reviews"
          dataIndex="_id"
          key="reviews"
          align="center"
          className="font-semibold"
          render={(id) => {
            return (
              <>
                <Tooltip color={"red"} title="Xem danh s??ch c??c ????nh gi??">
                  <button
                    onClick={() => {
                      history.push(`/admin/reviewsByRoom/${id}`);
                    }}
                    className="text-yellow-600 text-2xl mr-4 cursor-pointer"
                  >
                    <LikeOutlined />
                  </button>
                </Tooltip>
              </>
            );
          }}
        />
        <Column
          title="Name"
          align="center"
          className="font-semibold"
          dataIndex="name"
          key="name"
          width={300}
        />
        <Column
          title="Image"
          dataIndex="image"
          align="center"
          className="font-semibold"
          key="image"
          render={(img, item) => {
            return (
              <Tooltip placement="leftTop" color={"red"} title={"Ch???n ???nh m???i"}>
                <div className="flex justify-center items-center">
                  <div
                    onClick={() => {
                      fileInput.current.click();
                    }}
                    className="flex justify-around items-center cursor-pointer mr-2"
                  >
                    {img ? (
                      <img
                        style={{
                          width: 200,
                          height: 150,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                        src={img}
                        alt={img.name}
                      />
                    ) : (
                      <img
                        style={{
                          width: 200,
                          height: 150,
                          objectFit: "cover",
                          borderRadius: 10,
                          border: "2px solid black",
                        }}
                        src="https://bitsofco.de/content/images/2018/12/broken-1.png"
                        alt="???nh c???a ph??ng ch??a ???????c c???p nh???t"
                      />
                    )}
                  </div>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleChangeFile}
                    ref={fileInput}
                  />
                  <Tooltip color={"red"} title={"C???p nh???t"}>
                    <Button
                      ref={btnUpdateImg}
                      disabled={!selectedFile}
                      onClick={() => {
                        const formdata = new FormData();
                        formdata.append(
                          "room",
                          selectedFile,
                          selectedFile?.name
                        );
                        setSelectedFile(null);
                        dispatch(updateImgRoomAction(formdata, item._id));
                      }}
                    >
                      Update
                    </Button>
                  </Tooltip>
                  <Modal
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={700}
                    okType={"danger"}
                  >
                    <img
                      style={{
                        width: 600,
                        height: 400,
                        objectFit: "cover",
                        borderRadius: 14,
                      }}
                      src={imageUrl}
                      alt="..."
                    />
                  </Modal>
                </div>
              </Tooltip>
            );
          }}
        />
        <Column
          title="Location"
          dataIndex={["locationId", "province"]}
          key="location"
          align="center"
          className="font-semibold"
        />
        <Column
          title="Guest Max"
          align="center"
          className="font-semibold"
          dataIndex="guests"
          key="guests"
        />
        <Column
          title="Price (VND)"
          align="center"
          className="font-semibold"
          dataIndex="price"
          key="price"
          render={(price) => {
            return price.toLocaleString();
          }}
        />

        <Column
          title="Action"
          dataIndex="_id"
          key="action"
          align="center"
          className="font-semibold"
          render={(id) => {
            return (
              <>
                <Tooltip color={"red"} title="Xem chi ti???t ph??ng">
                  <button
                    onClick={() => {
                      dispatch(getRoomDetailAction(id));
                      history.push(`/admin/rooms/detail/${id}`);
                    }}
                    className="text-green-600 text-2xl mr-4 cursor-pointer"
                  >
                    <FileSearchOutlined />
                  </button>
                </Tooltip>
                <Tooltip color={"red"} title="S???a th??ng tin ph??ng">
                  <button
                    onClick={() => {
                      dispatch(getRoomDetailAction(id, locationId));
                      history.push(`/admin/rooms/edit/${locationId}`);
                    }}
                    className="text-blue-600 text-2xl mr-4 cursor-pointer"
                  >
                    <EditOutlined />
                  </button>
                </Tooltip>
                <Tooltip color={"red"} title="X??a ph??ng">
                  <button
                    onClick={() => {
                      window.confirm("B???n c?? ch???c mu???n x??a ph??ng n??y kh??ng?") &&
                        dispatch(deleteRoomAction(id, locationId));
                    }}
                    className="text-red-600 text-2xl cursor-pointer"
                  >
                    <DeleteOutlined />
                  </button>
                </Tooltip>
              </>
            );
          }}
        />
      </Table>
    </div>
  );
}
