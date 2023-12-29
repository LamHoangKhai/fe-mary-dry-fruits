import Header from '@/components/Layout/Header/Header_Index';
import Profile from '@/components/Layout/Profile/Profile_Index';

function UserPage() {
    return (
        <div>
            <Header title={'Profile'} />
            <Profile />
        </div>
    );
}

export default UserPage;
