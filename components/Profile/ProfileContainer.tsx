import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ProfileDescription from "./ProfileDescription";
import ProfileHeader from "./ProfileHeader";
import ProfileSnippets from "./ProfileSnippets";
import ProfileProjects from "./ProfileProjects";
import ProfileLinks from "./ProfileLinks";
import ProfileHobbies from "./ProfileHobbies";
import ProfileTags from "./ProfileTags";
import ProfileSongs from "./ProfileSongs";

const ProfileContainer = ({}) => {
    return (
        <ScrollView>
            <ProfileHeader/>
            <ProfileDescription/>
            <ProfileSnippets/>
            <ProfileProjects/>
            <ProfileLinks/>
            <ProfileHobbies/>
            <ProfileTags/>
            <ProfileSongs/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
});

export default ProfileContainer