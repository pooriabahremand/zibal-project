import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";
import {
  FormValuesInterface,
  FormattedInputPropsInterface,
} from "../interface/interface";

const FormattedInput: React.FC<FormattedInputPropsInterface> = ({
  value = "",
  onChange,
}) => {
  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const formattedValue = formatNumber(rawValue);
    if (onChange) {
      onChange(rawValue);
    }
    e.target.value = formattedValue;
  };

  return <Input value={formatNumber(value)} onChange={handleChange} />;
};

const { Option } = Select;

const ModalComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedOption(null);
  };

  const handleFinish = (values: FormValuesInterface) => {
    console.log("Form values:", values);
    message.success("درخواست تسویه با موفقیت ثبت شد");
    setIsModalOpen(false);
    form.resetFields();
    setSelectedOption(null);
  };

  const handleButtonClick = (value: string) => {
    setSelectedOption(value);
  };

  const modalTitle = (
    <div className="modal-title">
      <h4>تسویه کیف پول</h4>
      <hr />
    </div>
  );

  return (
    <div>
      <Button type="primary" onClick={showModal} className="background-blue">
        نمایش مدال
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            className="background-blue"
          >
            ثبت درخواست تسویه
          </Button>,
        ]}
        title={modalTitle}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ currentBalance: "15,000,000" }}
        >
          <div className="mm-bottom modal-amount-container">
            <p className="mm-bottom gray-color mm-top">موجودی فعلی:</p>
            <p className="modal-amount">
              15,000<span className="small-fontsize"> ریال</span>
            </p>
          </div>
          <div className="modal-inner-container">
            <div className="flex-basis mm-bottom">
              <Button
                type={selectedOption === "account" ? "primary" : "default"}
                onClick={() => handleButtonClick("account")}
                style={{
                  backgroundColor:
                    selectedOption === "account" ? "blue" : "white",
                }}
              >
                به حساب
              </Button>
              <Button
                type={selectedOption === "wallet" ? "primary" : "default"}
                onClick={() => handleButtonClick("wallet")}
                style={{
                  backgroundColor:
                    selectedOption === "wallet" ? "blue" : "white",
                }}
              >
                به کیف پول
              </Button>
            </div>
            <Form.Item
              label="مقصد تسویه"
              name="settlementDestination"
              rules={[
                { required: true, message: "لطفا مقصد تسویه را انتخاب کنید" },
              ]}
            >
              <Select placeholder="انتخاب شماره شبا و یا ورود شما جدید">
                <Option value="mainWallet">کیف پول اصلی</Option>
                <Option value="optionalWallet">کیف پول پرداخت اختیاری</Option>
                <Option value="settlementWallet">کیف پول تسویه</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="مبلغ تسویه"
              name="settlementAmount"
              rules={[
                { required: true, message: "لطفا مبلغ تسویه را وارد کنید" },
              ]}
            >
              <FormattedInput />
            </Form.Item>
            <Form.Item label="توضیحات (بابت)" name="description">
              <Input.TextArea />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalComponent;
