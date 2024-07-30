import TableComponent from "./components/TableComponent";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";

export default function App(): React.ReactNode {
  const customTheme = {
    token: {
      fontFamily: '"Vazir FD", sans-serif',
    },
  };
  return (
    <ConfigProvider theme={customTheme} locale={faIR}>
      <>
        <TableComponent />;
      </>
    </ConfigProvider>
  );
}
