import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Img,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import auth from "../../Auth";

export default function BannerTable() {
  const [products, setProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const url =
      "https://jatin-tagra-backend.vercel.app/api/v1/Banner/allBanner";
    try {
      const res = await axios.get(url, auth);
      const responseData = res?.data.data || [];
      setProducts(responseData);
    } catch (err) {
      console.log("err", err);
    }
  };

  const deletehandler = (id) => {
    axios
      .delete(
        `https://jatin-tagra-backend.vercel.app/api/v1/Banner/deleteBanner/${id}`,
        auth
      )
      .then((res) => {
        console.log(res.data.message);
        fetchCoupons();
        toast({
          title: `Banner Deleted Sucessfully`,
          position: " top-right",
          status: "success",
          isClosable: true,
        });
      });
  };

  return (
    <TableContainer
      style={{
        width: "90%",
        margin: "auto",
        marginTop: "30px",
        paddingTop: "10px",
        height: "500px",
        overflow: "auto",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        borderRadius: "10px",
      }}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th
              style={{
                fontSize: "18px",
                textAlign: "center",
                paddingBottom: "30px",
              }}
            >
              Banner Image
            </Th>
            <Th
              style={{
                fontSize: "18px",
                textAlign: "center",
                paddingBottom: "30px",
              }}
            >
              Banner Description
            </Th>
            <Th
              style={{
                fontSize: "18px",
                textAlign: "center",
                paddingBottom: "30px",
              }}
            >
              Delete Banner
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
              <Td>
                <Img
                  src={e.image}
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                    borderRadius: "10px",
                  }}
                />
              </Td>
              <Td fontSize={"34"} textAlign="center">
                {e.desc}
              </Td>
              <Td>
                <button style={{ paddingLeft: "48%" }}>
                  <DeleteIcon
                    style={{ fontSize: "25px" }}
                    onClick={() => deletehandler(e._id)}
                  />
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}