import React from "react";
import {useState, useCallback, memo} from "react";
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import axios from 'axios';
import './style.scss';

const initialFormData = {
    username: '',
    phoneNumber: '',
    city: '',
    deviceType:'WEB'
};

function BecomePartnerForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [formIsSent, setFormIsSent] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [unfilledError, setUnfilledError] = useState(null);
    const showError = error || unfilledError;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log(formData)
        if (!formData.username || !formData.phoneNumber || !formData.city) {
            setUnfilledError('unfilled error');
            return;
        }

        axios.post('/contacts', formData).then((response) => {
            if (response.status === 201) {
                localStorage.setItem('username', response.data.username);
                setResponse({
                    username: response.data.username,
                    phoneNumber: response.data.phoneNumber,
                    city: response.data.city,
                });
            }
        })
            .catch((error) => {
                setResponse(null);
                setError(error.message);
            });
        setFormData(formData);
        setFormIsSent(true);
    }, [formData])

    return (
        <div className={'BecomePartnerForm' + (formIsSent ? ' BecomePartnerFormIsSent' : '')} id='BecomePartnerForm'>
            <div className='BecomePartnerTitle'>
                <Typography variant='title4' fontWeight='body1'>СТАТИ ПАРТНЕРОМ</Typography>
                <Typography color='grey' variant='title7' fontWeight='body4'>або задати будь-які запитання</Typography>
            </div>
            <div className='BecomePartnerTitleMobile'>
                <Typography variant='title5' fontWeight='body1'>СТАТИ ПАРТНЕРОМ</Typography>
                <Typography color='grey' variant='title14' fontWeight='body3'>або задати будь-які запитання</Typography>
            </div>
            <form className='PartnerFormBlock' onSubmit={handleSubmit}>
                <div className='InputsDiv'>
                    <div className='InputBlock'>
                        <input
                            className='PartnerFormInput'
                            type="text"
                            placeholder="ІМ’Я"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='InputBlock'>
                        <input
                            className='PartnerFormInput'
                            type="tel"
                            placeholder="ТЕЛЕФОН"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='InputBlock'>
                        <input
                            className='PartnerFormInput'
                            type="text"
                            placeholder="МІСТО"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {showError && (
                    <div className='ErrorMessage'>
                        <Typography color='red' variant='title7' fontWeight='body4'>
                            {error ? null : 'Будь ласка, заповніть усі поля'}
                        </Typography>
                    </div>
                )}
                <div className="SendButtonDiv">
                    <Button onSubmit={handleSubmit} backgrndColor={formIsSent ? 'green' : 'blue'} size="small">
                        {formIsSent ?
                            <Typography variant='title4' fontWeight='body1'>НАДІСЛАНО</Typography> :
                            <Typography variant='title4' fontWeight='body1'>НАДІСЛАТИ</Typography>
                        }
                    </Button>
                </div>
                <div className="SendButtonDivMobile">
                    <Button onSubmit={handleSubmit} backgrndColor={formIsSent ? 'green' : 'blue'} size="mobile">
                        {formIsSent ?
                            <Typography variant='title16' fontWeight='body1'>НАДІСЛАНО</Typography> :
                            <Typography variant='title16' fontWeight='body1'>НАДІСЛАТИ</Typography>
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default memo(BecomePartnerForm);