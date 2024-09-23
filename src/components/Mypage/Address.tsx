import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Address = ({ isOpen, onRequestClose, zIndex = 100000 }) => {
    const [searchText, setSearchText] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchAddress = async () => {
        if (searchText.trim() === "") {
            alert("주소를 입력해주세요");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey={승인키}&currentPage=1&countPerPage=10&keyword=${searchText}&resultType=json`);
            const data = await response.json();

            if (response.ok && data.results.juso) {
                setAddresses(data.results.juso);
            } else {
                alert("검색 결과가 없습니다.");
            }
        } catch (error) {
            console.error("주소 검색 중 오류 발생:", error);
            alert("주소 검색 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="주소 검색 결과"
            shouldCloseOnOverlayClick={false} // 오버레이 클릭 시 모달이 닫히지 않도록 설정
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: zIndex,
                },
                overlay: {
                    zIndex: zIndex,
                },
            }}
        >
            <h2>검색 결과</h2>
            <button onClick={onRequestClose}>닫기</button>
            <div>
                <input 
                    type="text" 
                    value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)} 
                    placeholder="도로명 또는 지번을 입력하세요" 
                    style={{ padding: '10px', width: '80%' }}
                />
                <button onClick={searchAddress} style={{ padding: '10px' }}>
                    검색
                </button>
            </div>
            {loading ? (
                <p>검색 중...</p>
            ) : (
                <ul>
                    {addresses.map((address, index) => (
                        <li key={index}>
                            {address.roadAddr} ({address.jibunAddr})
                        </li>
                    ))}
                </ul>
            )}
        </Modal>
    );
};

export default Address;
