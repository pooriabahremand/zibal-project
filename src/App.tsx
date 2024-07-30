import TableComponent from "./components/TableComponent";
import { ConfigProvider } from "antd";

export default function App(): React.ReactNode {
  const customTheme = {
    token: {
      fontFamily: '"Vazirmatn", sans-serif',
    },
  };
  return (
    <ConfigProvider theme={customTheme}>
      <>
        <p>این یک تراکنش ساده است</p>
        <TableComponent />;
      </>
    </ConfigProvider>
  );
}
