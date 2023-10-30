import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import BaseUrl from "../../BaseUrl";
import axios from "axios";
import auth from "../../Auth";
const Delivery1 = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const url = BaseUrl() + "/api/v1/admin/getAllDriver";
    try {
      const res = await axios.get(url, auth);
      const responseData = res?.data.data || [];
      setProducts(responseData);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div>
      <TableContainer
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "30px",
          paddingTop: "10px",
          height: "500px",
          overflow: "auto",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.21) 0px 3px 6px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              {/* <Th
                              style={{
                                fontSize: "18px",
                                textAlign: "center",
                                paddingBottom: "30px",
                              }}
                            >
                              Banner Image
                            </Th> */}
              <Th
                style={{
                  fontSize: "18px",
                  textAlign: "center",
                  paddingBottom: "30px",
                }}
              >
                Full Name
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  textAlign: "center",
                  paddingBottom: "30px",
                }}
              >
                Email
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  textAlign: "center",
                  paddingBottom: "30px",
                }}
              >
                Mobile No.
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  textAlign: "center",
                  paddingBottom: "30px",
                }}
              >
                Wallet
              </Th>
              <Th
                style={{
                  fontSize: "18px",
                  textAlign: "center",
                  paddingBottom: "30px",
                }}
              >
                Language
              </Th>
              <Th
                style={{
                  fontSize: "16px",
                  textAlign: "center",
                  paddingBottom: "30px",
                }}
              >
                City
              </Th>
            </Tr>
          </Thead>
          <Tbody
            style={{
              color: "black",

              margin: "auto",
              height: "100px",
              overflowY: "auto",
            }}
          >
            {products.map((e, i) => (
              <Tr key={i}>
                <Td fontSize={"21"} textAlign="center">
                  {e.fullName}
                </Td>
                <Td fontSize={"21"} textAlign="center">
                  {e.email}
                </Td>
                <Td fontSize={"21"} textAlign="center">
                  {e.phone}
                </Td>
                <Td fontSize={"21"} textAlign="center">
                  {e.wallet}
                </Td>
                <Td fontSize={"21"} textAlign="center">
                  {e.language}
                </Td>
                <Td fontSize={"21"} textAlign="center">
                  {e.city}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Delivery1;
