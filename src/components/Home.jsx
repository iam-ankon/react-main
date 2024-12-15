import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { CChart } from "@coreui/react-chartjs";

const HomePage = () => {
  const [sizes, setSizes] = useState([300, 300, 300]);

  const handleResize = (index, newWidth) => {
    const totalWidth = sizes.reduce((a, b) => a + b, 0);
    const remainingWidth = totalWidth - newWidth;

    const otherIndexes = sizes.map((_, i) => i).filter((i) => i !== index);
    const newSizes = [...sizes];
    const otherSizeSum = otherIndexes.reduce((sum, i) => sum + sizes[i], 0);

    otherIndexes.forEach((i) => {
      newSizes[i] = Math.max(200, (remainingWidth * sizes[i]) / otherSizeSum);
    });

    newSizes[index] = newWidth;
    setSizes(newSizes);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflowX: "auto",
        height: "100vh",
        padding: "10px",
      }}
    >
      {sizes.map((size, index) => (
        <ResizableBox
          key={index}
          width={size}
          height={300}
          minConstraints={[200, 200]}
          maxConstraints={[800, 500]}
          resizeHandles={["e"]}
          onResizeStop={(e, { size: newSize }) =>
            handleResize(index, newSize.width)
          }
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            background: "#fff",
            boxSizing: "border-box",
          }}
        >
          <CChart
            type={index === 0 ? "polarArea" : index === 1 ? "line" : "bar"}
            data={
              index === 0
                ? {
                    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
                    datasets: [
                      {
                        data: [11, 16, 7, 3, 14],
                        backgroundColor: [
                          "#FF6384",
                          "#4BC0C0",
                          "#FFCE56",
                          "#E7E9ED",
                          "#36A2EB",
                        ],
                      },
                    ],
                  }
                : index === 1
                ? {
                    labels: ["January", "February", "March", "April", "May"],
                    datasets: [
                      {
                        label: "Dataset 1",
                        data: [30, 20, 40, 25, 35],
                        backgroundColor: "rgba(151, 187, 205, 0.2)",
                        borderColor: "rgba(151, 187, 205, 1)",
                      },
                    ],
                  }
                : {
                    labels: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ],
                    datasets: [
                      {
                        label: "Dataset 2",
                        data: [12, 19, 3, 5, 2],
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                      },
                    ],
                  }
            }
            style={{ height: "100%", width: "100%" }}
          />
        </ResizableBox>
      ))}
    </div>
  );
};

export default HomePage;
