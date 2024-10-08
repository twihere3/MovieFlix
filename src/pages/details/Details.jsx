import React from "react";
import "./Details.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/Detailsbanner";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const hasCast = data?.results && data.results.length > -1;

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      {hasCast && <Cast data={credits?.cast} loading={creditsLoading} />}
      {/* <Cast data={credits?.cast} loading={creditsLoading} /> */}
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
