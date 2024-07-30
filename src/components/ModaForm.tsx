import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";

interface FormattedInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const FormattedInput: React.FC<FormattedInputProps> = ({
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

const ModalForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = (values: any) => {
    console.log("Form values:", values);
    message.success("درخواست تسویه با موفقیت ثبت شد");
    setIsModalOpen(false);
    form.resetFields();
  };

  const modalTitle = (
    <div className="modal-title">
      <h3>تسویه کیف پول</h3>
      <hr />
    </div>
  );

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "blue" }}
      >
        نمایش مودال
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
            style={{ backgroundColor: "blue" }}
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
          <div style={{ marginBottom: "16px" }}>
            <h4>موجودی فعلی:</h4>
            <p style={{ color: "blue", marginTop: 12, fontSize: 24 }}>
              15,000<span style={{ fontSize: 12 }}>ریال</span>
            </p>
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
          <Form.Item label="توضیحات (اختیاری)" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalForm;
