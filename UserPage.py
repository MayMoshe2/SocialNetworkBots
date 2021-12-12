import temp
import DeliveryTracker
import time

from dataclasses import dataclass
from typing import Dict, Set
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
class UserPage:
    MESSAGE_FORMATTINGS = ["first_name"]

    def __init__(self, driver, message, delivery_tracker_filename, testing: bool = False):
        self.driver = driver
        self.message = message
        self.testing = testing
        self.delivery_tracker = DeliveryTracker(delivery_tracker_filename)

    def get_formatted_message(self, replace_strings: Dict[str, str]):
        message = self.message
        log = ", ".join([f"'<{k}>' = '{v}'" for k, v in replace_strings.items()])
        temp.logger.info(f"Using the following replace strings: {log}")
        for replace_string in self.MESSAGE_FORMATTINGS:
            if replace_string in replace_strings:
                value_to_insert = replace_strings[replace_string]
                message = message.replace(f"<{replace_string}>", value_to_insert)
        return message

    def send_message_to_user(self, user_element, **message_formatting):
        message_button = self.get_message_button(user_element)
        message_button.click()
        message = self.get_formatted_message(replace_strings=message_formatting)
        self.send_message(message)
        time.sleep(0.5)
        self.click_x()
        if self.testing is True:
            self.discard_message()

    def send_message_to_users(self, user_elements):
        for user_element in user_elements:
            full_name = self.get_full_name(user_element)
            if not self.delivery_tracker.already_delivered(full_name):
                temp.logger.info(f"Sending to {full_name}")
                first_name = full_name.split(" ")[0]
                self.send_message_to_user(user_element, first_name=first_name)
                self.delivery_tracker.add_user_to_delivered_list(full_name)
            else:
                temp.logger.info(f"Already delivered to {full_name}")

    def send_message(self, message):
        msgwin = self.driver.find_element_by_css_selector(".msg-form__contenteditable")
        msgwin.send_keys(message)
        if self.testing is False:
            msgwin.send_keys(Keys.ENTER)

    def discard_message(self):
        self.driver.find_element_by_xpath("//span[contains(.,'Discard')]").click()

    def get_user_elements(self):
        try:
            element_list_container = self.driver.find_element_by_css_selector(
                "#main > div > div > div.ph0.pv2.artdeco-card.mb2 > ul"
            )
            user_list = element_list_container.find_elements_by_css_selector("li")
            return user_list
        except Exception as exc:
            temp.logger.exception("failed to find buttons", exc_info=exc)

    def get_full_name(self, user_element):
        name_info = user_element.find_element_by_partial_link_text("View").text
        name_info_parts = name_info.split("\n")
        if len(name_info_parts) < 2:
            temp.logger.error(f"Seems like we have a problem with '{name_info}")
        full_name = name_info_parts[0]
        full_name= full_name.encode()
        full_name = str(full_name)[2:-1]
        temp.logger.info(f"Found user's name: '{full_name}'")
        return full_name

    def get_message_button(self, user_element):
        return user_element.find_element_by_xpath(".//span[contains(.,'Message')]")

    def click_x(self):
        temp.logger.info("click_x")
        try:
            self.driver.find_element_by_xpath("//div[2]/header/section[2]/button[3]").click()  # ash
        except Exception as exc:
            pass
        try:
            self.driver.find_element_by_xpath("/html/body/div[6]/aside/div[2]/header/section[2]/button[2]").click()
        except Exception as exc:
            pass
        try:
            self.driver.find_element_by_xpath("/html/body/div[6]/aside/div[3]/header/section[2]/button[3]").click()
        except Exception as exc:
            pass
