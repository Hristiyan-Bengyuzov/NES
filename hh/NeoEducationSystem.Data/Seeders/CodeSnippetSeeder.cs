using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data.Seeders
{
    internal class CodeSnippetSeeder : ISeeder
    {
        public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
        {
            if (context.CodeSnippets.Any()) return;

            await context.CodeSnippets.AddRangeAsync(new CodeSnippet[]
            {
				// integral types
				new CodeSnippet
                {
                    ParagraphId = 2,
                    Language = "csharp",
                    Code = "int integerNumber = 42;\r\nlong longNumber = 1234567890;"
                },
                new CodeSnippet
                {
                    ParagraphId = 2,
                    Language = "java",
                    Code = "int integerNumber = 42;\r\nlong longNumber = 1234567890L;"
                },

				// floating point
				new CodeSnippet
                {
                    ParagraphId = 4,
                    Language = "csharp",
                    Code = "double floatingPointNumber = 3.14;"
                },
                new CodeSnippet
                {
                    ParagraphId = 4,
                    Language = "java",
                    Code = "double floatingPointNumber = 3.14;"
                },

				// char
				new CodeSnippet
                {
                    ParagraphId = 5,
                    Language = "csharp",
                    Code = "char character = \'A\';",
                },
                new CodeSnippet
                {
                    ParagraphId = 5,
                    Language = "java",
                    Code = "char character = \'A\';",
                },

				// string
				new CodeSnippet
                {
                    ParagraphId = 6,
                    Language = "csharp",
                    Code = "string text = \"Hello, World!\";"
                },
                new CodeSnippet
                {
                    ParagraphId = 6,
                    Language = "java",
                    Code = "String text = \"Hello, World!\";"
                },

				// bool
				new CodeSnippet
                {
                    ParagraphId = 7,
                    Language = "csharp",
                    Code = "bool isTrue = true;"
                },
                new CodeSnippet
                {
                    ParagraphId = 7,
                    Language = "java",
                    Code = "boolean isTrue = true;"
                },
				


				// primer s if
				new CodeSnippet
                {
                    ParagraphId = 9,
                    Language = "csharp",
                    Code = "int n = 18;\r\n\r\nif (n > 18)\r\n{\r\n    Console.WriteLine(\"Числото е по-голямо от 18.\");\r\n}\r\nelse\r\n{\r\n    Console.WriteLine(\"Числото е по-малко или равно на 18.\");\r\n}"
                },
                new CodeSnippet
                {
                    ParagraphId = 9,
                    Language = "java",
                    Code = "int n = 18;\r\n\r\nif (n > 18) {\r\n  System.out.println(\"Числото е по-голямо от 18.\");\r\n} else {\r\n  System.out.println(\"Числото е по-малко или равно на 18.\");\r\n}"
                },
				
				// primer s switch
				new CodeSnippet
                {
                    ParagraphId = 10,
                    Language = "csharp",
                    Code = "int weekDay = 3;\r\nstring day;\r\n\r\nswitch (weekDay)\r\n{\r\n    case 1:\r\n        day = \"Понеделник\";\r\n        break;\r\n    case 2:\r\n        day = \"Вторник\";\r\n        break;\r\n    case 3:\r\n        day = \"Сряда\";\r\n        break;\r\n    case 4:\r\n        day = \"Четвъртък\";\r\n        break;\r\n    case 5:\r\n        day = \"Петък\";\r\n        break;\r\n    case 6:\r\n        day = \"Събота\";\r\n        break;\r\n    case 7:\r\n        day = \"Неделя\";\r\n        break;\r\n    default:\r\n        day = \"Невалиден ден\";\r\n        break;\r\n}\r\n\r\nConsole.WriteLine($\"Денят от седмицата е: {day}\");"
                },
                new CodeSnippet
                {
                    ParagraphId = 10,
                    Language = "java",
                    Code = "int weekDay = 3;\r\nString day;\r\n\r\nswitch (weekDay) {\r\n    case 1:\r\n        day = \"Понеделник\";\r\n        break;\r\n    case 2:\r\n        day = \"Вторник\";\r\n        break;\r\n    case 3:\r\n        day = \"Сряда\";\r\n        break;\r\n    case 4:\r\n        day = \"Четвъртък\";\r\n        break;\r\n    case 5:\r\n        day = \"Петък\";\r\n        break;\r\n    case 6:\r\n        day = \"Събота\";\r\n        break;\r\n    case 7:\r\n        day = \"Неделя\";\r\n        break;\r\n    default:\r\n        day = \"Невалиден ден\";\r\n        break;\r\n    }\r\n\r\nSystem.out.println(\"Денят от седмицата е: \" + day);"
                }
            }); ;

            await context.SaveChangesAsync();
        }
    }
}