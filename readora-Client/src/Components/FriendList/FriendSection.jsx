import React from 'react'
import FriendList from './FriendList'
import { MdSearch } from "react-icons/md";

const FriendSection = () => {
    const friendList = [
        {
            username:'gaurav1_9',
            name:'Gaurav Kumar Das',
            profilePic: 'https://storage.googleapis.com/kagglesdsdata/datasets/6361783/10280674/dataset/img-1.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20250426%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250426T060805Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=b93c575cd590f1d03c5d96d22ccc7a993d4bb0770b557d6e0dca8272fb8ffd4a51ef5450efbb6d1fa2bf9f9cd7510350ad07356edf86304535d75eb1ac875f3930bfdccef770d41ea8750c18b6fb81bb408d9fcad82062897220d9580fe17184a1a81be123c01a293875c6389e3072bc637d07e0e80228e4d3fef03943eedcea5e64a91b4b004d2e4cc048fa5dd23a0a6a3604b83ab6b4151c3b552d0f73db752afcb7eaa840dcd9b6dd2e2140ef7bd3ca14a3076d797ad2647b5946f09fcb0dfa53e7986d79dfcf84f9a8fc78b6212c94ac31f8a87bf3421af1be25097fa3ea7c762861da87fe978e3360d9534dff9348e346de2cb42f9ecab42fa4c5a17792',
        },
        {
            username:'upmd13',
            name:'Upama Das',
            profilePic: 'https://storage.googleapis.com/kagglesdsdata/datasets/6361783/10280674/dataset/img-10.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20250426%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250426T060859Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=26f06a6d1cfa4d41fa98b08fef4bb482eacc727d6963908e8814414f01ec1c48499ff429e70b11d9e10ad42e355574d18c064e02e839bd291075d39afbe1c4e6f3006ac33eeb8412d70ec966af29d52e5c65c13cc89c1eafccbf9e84aa686cf04ccecc1088fe5f2e7ca9ea53f7c1d68ea557ee0fa0aeb7d1cd03d2fb35bf1144b9f1bf1ef2637838fcef0a1d31503c614b97413027956c2abccff253f32f29cd5998b9bc783cfc6941d969b07031a816c69ec895036fc4cc614cb5739bcc9c4a78a075651a1527898ed082ab459c845222cf845221844756475d960badbc599acdd9d7fa31a4fec58c6426d9be304fded74a9d4803950d030f3d8ac8e540b856',
        },
        {
            username:'xyz',
            name:'Abc Xyz',
            profilePic: 'https://storage.googleapis.com/kagglesdsdata/datasets/6361783/10280674/dataset/img-10.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20250426%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250426T060859Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=26f06a6d1cfa4d41fa98b08fef4bb482eacc727d6963908e8814414f01ec1c48499ff429e70b11d9e10ad42e355574d18c064e02e839bd291075d39afbe1c4e6f3006ac33eeb8412d70ec966af29d52e5c65c13cc89c1eafccbf9e84aa686cf04ccecc1088fe5f2e7ca9ea53f7c1d68ea557ee0fa0aeb7d1cd03d2fb35bf1144b9f1bf1ef2637838fcef0a1d31503c614b97413027956c2abccff253f32f29cd5998b9bc783cfc6941d969b07031a816c69ec895036fc4cc614cb5739bcc9c4a78a075651a1527898ed082ab459c845222cf845221844756475d960badbc599acdd9d7fa31a4fec58c6426d9be304fded74a9d4803950d030f3d8ac8e540b856',
        },
        {
            username:'rishik._billa',
            name:'Rishik Baishya',
            profilePic: 'https://storage.googleapis.com/kagglesdsdata/datasets/6361783/10280674/dataset/img-1.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20250426%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250426T060805Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=b93c575cd590f1d03c5d96d22ccc7a993d4bb0770b557d6e0dca8272fb8ffd4a51ef5450efbb6d1fa2bf9f9cd7510350ad07356edf86304535d75eb1ac875f3930bfdccef770d41ea8750c18b6fb81bb408d9fcad82062897220d9580fe17184a1a81be123c01a293875c6389e3072bc637d07e0e80228e4d3fef03943eedcea5e64a91b4b004d2e4cc048fa5dd23a0a6a3604b83ab6b4151c3b552d0f73db752afcb7eaa840dcd9b6dd2e2140ef7bd3ca14a3076d797ad2647b5946f09fcb0dfa53e7986d79dfcf84f9a8fc78b6212c94ac31f8a87bf3421af1be25097fa3ea7c762861da87fe978e3360d9534dff9348e346de2cb42f9ecab42fa4c5a17792',
            
        },
        {
            username:'pq_123',
            name:'Pqr ST',
            profilePic: 'https://storage.googleapis.com/kagglesdsdata/datasets/6361783/10280674/dataset/img-10.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20250426%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250426T060859Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=26f06a6d1cfa4d41fa98b08fef4bb482eacc727d6963908e8814414f01ec1c48499ff429e70b11d9e10ad42e355574d18c064e02e839bd291075d39afbe1c4e6f3006ac33eeb8412d70ec966af29d52e5c65c13cc89c1eafccbf9e84aa686cf04ccecc1088fe5f2e7ca9ea53f7c1d68ea557ee0fa0aeb7d1cd03d2fb35bf1144b9f1bf1ef2637838fcef0a1d31503c614b97413027956c2abccff253f32f29cd5998b9bc783cfc6941d969b07031a816c69ec895036fc4cc614cb5739bcc9c4a78a075651a1527898ed082ab459c845222cf845221844756475d960badbc599acdd9d7fa31a4fec58c6426d9be304fded74a9d4803950d030f3d8ac8e540b856',
        },
    ]
    return (
        <div className="hidden flex-1 h-full items-center pt-10 lg:flex flex-col">
            <div className="relative w-8/9 mb-4">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xl text-babyPowder">
                    <MdSearch />
                </span>
                <input 
                    type="text" 
                    placeholder="Search friends..."
                    className="w-full pl-10 pr-3 py-2 text-lg rounded-lg bg-gunMetal focus:outline-none text-babyPowder"
                />
            </div>
            <FriendList list={friendList}/>
        </div>
    )
}

export default FriendSection
