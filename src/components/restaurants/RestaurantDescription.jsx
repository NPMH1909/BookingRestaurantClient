import { Card, CardBody, Typography } from "@material-tailwind/react";

const RestaurantDescription = ({ restaurant, mostVideo }) => {
  return (
    <Card className="mt-5">
      <CardBody>
        <Typography variant="h3" color="black">
          Chi tiết về {restaurant?.name}
        </Typography>

        <Typography variant="medium" color="black" className="my-5">
          {restaurant?.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Typography>

        {mostVideo && (
          <div className="mt-5">
            <Typography variant="h5" color="black">
              Video nổi bật
            </Typography>
            <video controls className="mt-3 rounded-lg shadow-lg w-[600px] h-[340px] object-cover">
              <source src={mostVideo?.url} type="video/mp4" />
              Trình duyệt không hỗ trợ phát video.
            </video>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default RestaurantDescription;
