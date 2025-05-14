import { Link } from 'react-router-dom';
import { useTheme } from '../stores/theme.store';

function Navbar() {
  const { theme, setTheme } = useTheme();  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? 'dark' : 'purple-white');
  };

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          โลโก้
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">หน้าหลัก</Link>
          </li>
          <li>
            <Link to="/about">เกี่ยวกับ</Link>
          </li>
          <li>
            <Link to="/contact">ติดต่อ</Link>
          </li>
        </ul>
        <label className="swap swap-rotate">          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === 'dark'} 
            onChange={handleThemeChange}
            aria-label="สลับธีม"
          />
          <svg
            className="swap-off fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-label="sun"
          >
            <path d="M12 2v2m0 16v2m-8.66-18.66l1.41 1.41m14.24 14.24l-1.41 1.41M2 12h2m16 0h2m-4.24-8.66l-1.41 1.41m-14.24 14.24l1.41-1.41M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <svg
            className="swap-on fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-label="moon"
          >
            <path d="M12 3a6 6 0 009 9 9 9 0 11-9-9z" />
          </svg>
        </label>
      </div>
    </div>
  );
}

export default Navbar;