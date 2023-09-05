import { DeleteIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ruleAdded, ruleRemoved, selectJokeRules } from "./aiJokesSlice";

function JokesSettings() {
  const initialForm = { name: "", description: "" };
  const [form, setForm] = useState(initialForm);
  const rules = useSelector(selectJokeRules);
  const dispatch = useDispatch();

  const handleRuleRemove = (ruleName) => {
    dispatch(ruleRemoved(ruleName));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(ruleAdded(form));
    setForm(initialForm);
  };

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button leftIcon={<SettingsIcon />} variant="solid">
          Settings
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Joke Rules</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Flex width="100%" direction="column">
              {rules.map((rule) => (
                <Flex
                  key={rule.name}
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Text>
                    <Badge mr={2} colorScheme="purple">
                      {rule.name}
                    </Badge>
                    <small>{rule.description}</small>
                  </Text>
                  <IconButton
                    onClick={() => handleRuleRemove(rule.name)}
                    variant="outline"
                    icon={<DeleteIcon />}
                    size="sm"
                  />
                </Flex>
              ))}
            </Flex>
          </PopoverBody>
          <PopoverFooter>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <InputGroup size="sm" mb={2}>
                  <InputLeftAddon>Name</InputLeftAddon>
                  <Input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <InputGroup size="sm" mb={2}>
                  <InputLeftAddon>Description</InputLeftAddon>
                  <Input
                    type="text"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>

              <Button size="sm" type="submit" alignSelf="flex-end">
                Submit
              </Button>
            </form>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default JokesSettings;
