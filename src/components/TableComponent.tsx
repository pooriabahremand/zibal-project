import React, { useState } from "react";
import { Table, Input, message } from "antd";
import { SearchOutlined, CopyOutlined } from "@ant-design/icons";
import data from "../mockData";
import { dataInterface } from "../interface/interface";
import ModalComponent from "./ModaForm";

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
        <div style={{ display: "flex" }}>
          <span>شماره تراکنش</span>
          <SearchOutlined
            onClick={toggleSearch}
            style={{
              cursor: "pointer",
              marginRight: 8,
              padding: 6,
              borderRadius: 10,
              color: "white",
              backgroundColor: "blue",
            }}
          />
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
                style={{ marginLeft: 8, width: "100%" }}
              />
            )}
          </div>
        </div>
      ),
      dataIndex: "trackId",
      key: "trackId",
      render: (trackId: number) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ width: 80 }}>{trackId}</p>
          <CopyOutlined
            onClick={() => handleCopy(trackId)}
            style={{ cursor: "pointer", marginRight: 8 }}
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
        <div style={{ display: "flex" }}>
          <span>شماره کارت</span>
          <SearchOutlined
            style={{
              cursor: "pointer",
              marginRight: 8,
              padding: 6,
              borderRadius: 10,
              color: "white",
              backgroundColor: "blue",
            }}
          />
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
      <div style={{ marginTop: 22 }}>
        <ModalComponent />
      </div>
    </div>
  );
};

export default TableComponent;
