import { AuthContext } from 'context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import Button from 'shared/Button/Button';
import Loader from 'shared/Spinner/Loader';
import axiosConfig from 'utilities/axiosConfig';
import CouponData, { CouponDataProps } from './CouponData';
import { StyledCouponsList } from './CouponsList.css';

function CouponsList(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponDataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { isLogged } = useContext(AuthContext);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        try {
            const res = await axiosConfig.get('/coupons');

            if (res.status === 200) {
                setCoupons(res.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <StyledCouponsList>
                    {isLogged ? (
                        <>
                            <h2 className="title">Your coupons </h2>
                            <div className="info">
                                <h5>amount</h5>
                                <h5>possible win</h5>
                                <h5>status</h5>
                            </div>
                            <div className="coupons-list">
                                {coupons.map((coupon) => (
                                    <CouponData
                                        key={coupon._id}
                                        _id={coupon._id}
                                        amount={coupon.amount}
                                        possiblyWin={coupon.possiblyWin}
                                        state={coupon.state}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 style={{ margin: '15px auto 20px' }}>Login to see yours coupons list</h2>
                            <Button click={() => window.open('http://localhost:3001/google', '_self')}>Login</Button>
                        </>
                    )}
                </StyledCouponsList>
            )}
        </>
    );
}

export default CouponsList;
