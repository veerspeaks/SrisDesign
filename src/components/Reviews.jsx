import ReactStars from "react-rating-stars-component";

function Reviews({ rate, count }) {
    return (
        <div > 
            <div className="flex items-center gap-5">
                <ReactStars
                    value={rate}
                    count={5}
                    size={24}
                    activeColor="#6C48C5"
                    edit={false}
                    isHalf={true}
                />
                <div className="text-sm text-white">{rate}</div>
                <div className="text-sm text-white">({count})</div>    
            </div>
        </div>  
    );
}

export default Reviews;