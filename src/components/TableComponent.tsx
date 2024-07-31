import React, { useState } from "react";
import { Table, Input, message } from "antd";
import { SearchOutlined, CopyOutlined } from "@ant-design/icons";
import data from "../mockData";
import { dataInterface } from "../interface/interface";
import ModalComponent from "./ModalForm";

const TableComponent: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((transaction: dataInterface) =>
    transaction.trackId.toString().includes(searchText)
  );

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setSearchText("");
  };

  const handleCopy = (trackId: number) => {
    navigator.clipboard.writeText(trackId.toString());
    message.success("در کلیپ بورد کپی شد.");
  };

  const columns = [
    {
      title: (
        <div className="flex-basis">
          <span>شماره تراکنش</span>
          <SearchOutlined onClick={toggleSearch} className="search-icon" />
          <div
            style={{
              width: showSearch ? "200px" : "0",
              transition: "width 0.3s",
              overflow: "hidden",
            }}
          >
            {showSearch && (
              <Input
                autoFocus
                placeholder="جستجوی شماره تراکنش"
                value={searchText}
                onChange={handleSearch}
              />
            )}
          </div>
        </div>
      ),
      dataIndex: "trackId",
      key: "trackId",
      render: (trackId: number) => (
        <div className="flex-basis">
          <p className="track-id">{trackId}</p>
          <CopyOutlined
            onClick={() => handleCopy(trackId)}
            className="copy-icon"
          />
        </div>
      ),
    },
    {
      title: "وضعیت تراکنش",
      dataIndex: "status",
      key: "status",
      render: (status: number) =>
        status === 1 ? "پرداخت موفق" : "پرداخت ناموفق",
    },
    {
      title: "تاریخ پرداخت",
      dataIndex: "paidAt",
      key: "paidAt",
    },
    {
      title: "مبلغ",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toLocaleString()} ریال`,
    },
    {
      title: (
        <div className="flex-basis">
          <span>شماره کارت</span>
          <SearchOutlined className="search-icon" />
        </div>
      ),
      dataIndex: "cardNumber",
      key: "cardNumber",
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="trackId"
        pagination={false}
      />
      <div className="bm-top">
        <ModalComponent />
      </div>
    </div>
  );
};

export default TableComponent;
