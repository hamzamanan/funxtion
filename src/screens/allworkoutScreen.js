import React, { useEffect, useState } from "react";
import { getAllWorkoutFunxtion } from "../api/request";
import { Spin } from "antd";
import {
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function AllWorkoutScreen() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [allworkoutData, setAllworkoutData] = useState([]);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTU5NzA1NDksImV4cCI6MTY4NzUwNjU0OSwianRpIjoiMzFBbjB0MjNLcGY2OFVUVFNCV0h1UyIsInNlc3MiOiJoOHRmMTFoZ20wcXQwM3Jvb2t1YjhpcHFnZyIsImtleSI6bnVsbCwic2FsdCI6IjE5OWMyN2E4Iiwic2NvcGUiOlsidmlld192aWRlbyIsInZpZXdfY2hhbm5lbCIsInZpZXdfZ3JvdXAiLCJ2aWV3X3ZpZGVvcyIsInZpZXdfY2hhbm5lbHMiLCJ2aWV3X2dyb3VwcyIsInBsYXlsaXN0X2FjY2VzcyIsInByaXZhdGVfbXNnX2FjY2VzcyIsImRvd25sb2FkX3ZpZGVvIiwiYWxsb3dfY3JlYXRlX3BsYXlsaXN0IiwiYmxvZ3NfbW9kZXJhdG9yIiwiaGVscGRlc2tfbW9kZXJhdG9yIl0sInN1YiI6eyJ1c2VyaWQiOjM3LCJjYXRlZ29yeSI6bnVsbCwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoiIiwic2V4IjoiIiwiZG9iIjoiMjAyMi0wNi0xMCIsImNvdW50cnkiOiJQSyIsImxldmVsIjoyLCJkb2oiOiIyMDIyLTAxLTMxIDA2OjMxOjIxIiwiYmFja2dyb3VuZF9hdHRhY2hlbWVudCI6Im5vIiwibGFzdF9hY3RpdmUiOiIyMDIyLTA2LTIwIDA2OjExOjU1Iiwid2VsY29tZV9lbWFpbF9zZW50Ijoibm8iLCJsaWtlcyI6MCwibGFuZ3VhZ2VfaWQiOm51bGwsInBpbiI6MzEzNywiZXhwaXJ5IjoiMjAyMi0wNi0wOCAxMTozMDozOSIsIm1zaXNkbiI6OTIzMjM5OTc4ODQ3LCJuYW1lIjoia2h1cnJpYSBaYWZhciBLaGFuIHVwZGF0ZSAyIiwid2VpZ2h0Ijo2MiwiaGVpZ2h0Ijo1LCJnb2FsX2lkIjoyLCJ2ZXJpZnkiOjEsInVfc2VyaWVzX2lkIjoxNCwidGltZV9ub3RpZnkiOiIxMDowOTowMCIsInN0YXJ0X2RhdGUiOiIyMDIyLTA2LTEwIiwibGlzdF9pZCI6MTQyLCJ1X2NvdW50cnlfaWQiOjAsImFib3V0ZmxhZyI6MCwiZ29hbGZsYWciOjEsInN1YnNjcmliZWQiOiJZZXMiLCJzdWJzY3JpYmVkX3BhY2thZ2UiOiI4IiwiZGFpbHlfbGltaXRfcmVhY2hlZCI6Ik5vIiwiaXNfZGlldF9zdWJzY3JpYmVkIjowLCJkaWV0X3BsYW4iOm51bGwsImZyZWVfdHJpYWwiOiJObyIsImhlaWdodF9mZWV0Ijo1LCJoZWlnaHRfaW5jaCI6bnVsbCwid2VpZ2h0X2tpbG8iOjYyLCJ3ZWlnaHRfZ3JhbSI6bnVsbCwiaGVpZ2h0X3VuaXQiOiJmdCIsIndlaWdodF91bml0Ijoia2ciLCJpc19iYW5uZWQiOmZhbHNlLCJpc19hY3RpdmUiOmZhbHNlfX0.cGdPNLQ7buNvyF03Q0A5a3uwVT8mRbQtadCcXeZuJLo";
  useEffect(() => {
    getAllWorkoutFunxtion(currentPage, token).then((res) => {
      console.log("THE RESPONSE is", res.data.meta.pages);
      setTotalPages(res.data.meta.pages.total);
      setLoading(false);
      setAllworkoutData(res.data.data);
    });
  }, []);

  const callPageData = (page) => {
    getAllWorkoutFunxtion(page, token).then((resp) => {
      console.log("PAGE RESPO", resp);
      setCurrPage(resp.data.meta.pages.current);
      setAllworkoutData(resp.data.data);
      setLoading(false);
    });
  };

  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 45, color: "#FF1E1E", marginBottom: 20 }}
      spin
    />
  );
  if (loading) {
    return (
      <div class="loader">
        <Spin className="spinner" indicator={antIcon} tip="Loading" />
      </div>
    );
  }

  return (
    <div>
      <p>THE TOTAL NUMBER OF PAGES ARE {totalPages}</p>
      <div
        style={{
          width: "100%",
          border: "1px solid green",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {allworkoutData.map((item, index) => {
          return (
            <Link
              to={"/details"}
              state={{
                exerciseID: item.id,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={item.attributes["secondary-image"]} />
                <p>{item.attributes.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: " 0 auto",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            setLoading(true);
            callPageData(currentPage - 1);
          }}
        >
          <LeftOutlined />
        </button>
        <p style={{ marginLeft: "10px", marginRight: "10px" }}>{currentPage}</p>
        <button
          onClick={() => {
            setLoading(true);
            callPageData(currentPage + 1);
          }}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}

export default AllWorkoutScreen;
