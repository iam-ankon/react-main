import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { CChart } from "@coreui/react-chartjs";

const HomePage = () => {
  const [sizes, setSizes] = useState([800, 300, 300]);

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
        flexDirection: "column", // Stacks the sections vertically
        justifyContent: "flex-start",
        alignItems: "stretch",
        height: "100vh",
        overflow: "auto",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch", // Ensure the charts stretch to full height
          overflowX: "auto",
          marginBottom: "10px", // Spacing between charts and table
          width: "100%", // Ensure the container takes up full width
        }}
      >
        {sizes.map((size, index) => (
          <ResizableBox
            key={index}
            width={size} // Size can still be adjusted dynamically
            height={300} // Set height to 300px, but you can adjust based on need
            minConstraints={[200, 200]} // Ensure min size constraints
            maxConstraints={[800, 500]} // Ensure max size constraints
            resizeHandles={["e"]} // Allow horizontal resize
            onResizeStop={(e, { size: newSize }) =>
              handleResize(index, newSize.width)
            }
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              background: "#fff",
              boxSizing: "border-box",
              flex: 1, // Allow each chart box to grow/shrink based on available space
              height: "100%", // Ensure each ResizableBox takes up the full height of its container
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
              style={{
                height: "100%", // Make chart responsive to the box height
                width: "100%", // Make chart responsive to the box width
              }}
            />
          </ResizableBox>
        ))}
      </div>

      <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          className="table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              {[
                "Department",
                "Total Quantity",
                "Value",
                "Shipped Quantity",
                "Shipped Value",
                "Balance Quantity",
                "Shipped %",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{
                    padding: "1vw 2vw", // Responsive padding (viewport-based units)
                    textAlign: "left", // Align text to the left
                    border: "1px solid #ccc",
                  }}
                >
                  {header}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td
                  style={{
                    padding: "1vw 2vw", // Match padding with <th>
                    border: "1px solid #ccc",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <div className="font-bold">Hgsxx</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                  34834984334834
                </td>
                <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                  12340233444
                </td>
                <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                  23444
                </td>
                <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                  34566
                </td>
                <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                  3545
                </td>
                <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                  0%
                </td>
                {/* <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                  <button className="btn btn-ghost btn-xs">details</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
