import React from 'react';

const UserBanner = ({ firstName, lastName }) => {
    return (
        <div 
            className="d-flex align-items-center"
            style={{
                width: '100%',
                height: '368px', 
                backgroundImage: 'url("/banner-account.jpg")',
                backgroundSize: 'cover', 
                backgroundPosition: 'left bottom',             
                backgroundRepeat: 'no-repeat',
                color: 'white',           
                display: 'flex',
                alignItems: 'center' 
            }}
        >
            <div style={{ width: '100%', paddingLeft: '80px' }}> 
                
                {/* XIN CHÀO */}
                <p style={{ 
                    fontSize: '1.6rem', 
                    margin: 0, 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '3px', 
                    lineHeight: '1.8'
                }}>
                    Xin chào
                </p>
                
                {/* TÊN NGƯỜI DÙNG */}
                <h1 style={{ 
                    fontSize: '2.5rem', 
                    margin: 0, 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px'
                }}>
                    {firstName} {lastName}
                </h1>
                
            </div>
        </div>
    );
};

export default UserBanner;