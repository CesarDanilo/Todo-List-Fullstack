import logo from '../img/logo/t.png';

export default function Sidebar({ onSelect }) {
    return (
        <div className="w-[500px] text-white p-10 " style={{ backgroundColor: '#f1f1eb' }}>
            <div>
                {/* imagem logo */}
                <div className="">
                    <img src={logo} alt="logo" srcset="" className='w-[300px] h-[300px]' />
                </div>
            </div>
            <div className="">
                <ul>
                    <li className="mb-2 cursor-pointer text-gray-950 font-bold font-sans " onClick={() => onSelect('Item 1')}>
                        ALL STAKS
                    </li>
                    <li className="mb-2 cursor-pointer text-gray-950 font-bold font-sans" onClick={() => onSelect('Item 1')}>
                        PENDING
                    </li>
                    <li className="mb-2 cursor-pointer text-gray-950 font-bold font-sans" onClick={() => onSelect('Item 1')}>
                        COMPLETED
                    </li>
                    <li className="mb-2 cursor-pointer text-gray-950 font-bold font-sans" onClick={() => onSelect('Item 1')}>
                        TRASH
                    </li>
                </ul>
            </div>
        </div>
    );
}